import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";
const {VITE_API_URL} = import.meta.env;
const schema = zod.object({
  email: zod.string().email("Correo electrónico inválido"),
  password: zod.string().min(3, "La contraseña debe tener al menos 3 caracteres"),
});


const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useStore();
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });
    const { data,isPending,error } = useQuery({
  queryKey: ['users'],
  queryFn: async () => fetch(`${VITE_API_URL}/api/users`).then(res => res.json()),
});

const onSubmit = (datos) => {
    if(data.some((user) => user.email === datos.email && user.password === datos.password)){
        const findUser = data.find((user) => user.email === datos.email && user.password === datos.password);
        const user = findUser;
        toast.success('Inicio de sesión exitoso');
        setUser(user);
        navigate("/");

    } else {
        toast.error("Credenciales inválidas");
    }
}



    
  return (
    <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-center min-h-screen p-4 bg-white">
        <Card className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-center">Iniciar Sesión</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label className="block mb-1 text-sm font-medium" htmlFor="email">Correo Electrónico</Label>
                    <Input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ingrese su correo electrónico"
                        required
                        {...register("email")}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors?.email?.message.toString()}</p>}
                </div>
                <div>
                    <Label className="block mb-1 text-sm font-medium" htmlFor="password">Contraseña</Label>
                    <Input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ingrese su contraseña"
                        required
                        {...register("password")}
                        
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors && String(errors?.password?.message)}</p>}
                </div>
                 
                <Button
                    type="submit"
                    disabled={isDirty && !isValid && isPending ? true : false}
                    className="flex-1 w-full px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:opacity-50 hover:bg-blue-600"
                >
                    Iniciar Sesión
                </Button>
                {(error || Object.keys(errors).length > 0) && (
                    <p className="mt-1 text-sm text-red-500">
                        {error instanceof Error ? error.message : 'email o contraseña incorrectos'}
                    </p>
                )}
                <div className="mt-4 text-sm text-center">
                    ¿No tienes una cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate</a>
                </div>
            </form>
        </Card>
    </motion.div>
  );
}
export default Login;