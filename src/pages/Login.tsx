import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  email: zod.string().email("Correo electrónico inválido"),
  password: zod.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});



const Login = () => {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });
    
  return (
    <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-center min-h-screen bg-white p-4">
        <Card className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            <form className="space-y-4">
                <div>
                    <Label className="block text-sm font-medium mb-1" htmlFor="email">Correo Electrónico</Label>
                    <Input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Ingrese su correo electrónico"
                        required
                        {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors?.email?.message.toString()}</p>}
                </div>
                <div>
                    <Label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</Label>
                    <Input
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Ingrese su contraseña"
                        required
                        {...register("password")}
                        
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors && String(errors?.password?.message)}</p>}
                </div>
                 
                <Button
                    type="submit"
                    onClick={handleSubmit((data) => console.log(data))}
                    disabled={isDirty && !isValid}
                    className="flex-1 w-full disabled:cursor-not-allowed"
                >
                    Iniciar Sesión
                </Button>
                <div className="text-sm text-center mt-4">
                    ¿No tienes una cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate</a>
                </div>
            </form>
        </Card>
    </motion.div>
  );
}
export default Login;