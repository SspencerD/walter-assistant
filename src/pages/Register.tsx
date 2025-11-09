import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Datepicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { formatearRut } from "@/lib/rutFormat";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { toast } from 'sonner';
const rutRegex = /^(\d{1,3}(?:\.\d{3}){2}-(\d{1}|[kK]))|(\d{1,3}(?:\d{3}){2}-(\d{1}|[kK]))$/;


const registerSchema = zod.object({
  name: zod
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),
  lastname: zod
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido debe tener como máximo 100 caracteres"),
  birthday: zod
    .string()
    .min(10, "La fecha de nacimiento debe tener 10 caracteres")
    .max(10, "La fecha de nacimiento debe tener 10 caracteres"),
  country: zod
    .string()
    .min(2, "El país debe tener al menos 2 caracteres")
    .max(100, "El país debe tener como máximo 100 caracteres"),
  phonePrefix: zod
    .string()
    .min(2, "El prefijo telefónico debe tener al menos 2 caracteres")
    .max(10, "El prefijo telefónico debe tener como máximo 10 caracteres"),
  phoneNumber: zod
    .string()
    .min(8, "El número de teléfono debe tener al menos 8 caracteres")
    .max(15, "El número de teléfono debe tener como máximo 15 caracteres"),
  documentType: zod.enum(["RUT", "Pasaporte", "Otro"]),
  documentNumber: zod
    .string()
    .min(2, "El número de documento debe tener al menos 2 caracteres")
    .max(100, "El número de documento debe tener como máximo 100 caracteres"),
  gender: zod.enum(["M", "F", "O"]),
  password: zod
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña debe tener como máximo 100 caracteres"),
  confirmPassword: zod
    .string()
    .min(6, "La confirmación de contraseña debe tener al menos 6 caracteres")
    .max(
      100,
      "La confirmación de contraseña debe tener como máximo 100 caracteres"
    ),
  email: zod.string().email('Correo electrónico inválido'),
  consent: zod.boolean().refine((val) => val === true, { message: "Debes aceptar los términos y condiciones" }),
}).superRefine((data, ctx) => {
  if (data.documentType === "RUT") {
    // 1) Formato
    if (!rutRegex.test(data.documentNumber)) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["documentNumber"],
        message: "RUT inválido. Ej: 12.345.678-9",
      });
      return;
    }
    if(data.password !== data.confirmPassword){
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden",
      });
    }
    // 2) (Opcional) Dígito verificador
    const clean = data.documentNumber.replace(/\./g, "").toUpperCase(); // 12345678-9
    const [num, dv] = clean.split("-");
    if (!num || !dv) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["documentNumber"],
        message: "RUT inválido",
      });
      return;
    }
    let sum = 0, mul = 2;
    for (let i = num.length - 1; i >= 0; i--) {
      sum += Number(num[i]) * mul;
      mul = mul === 7 ? 2 : mul + 1;
    }
    const res = 11 - (sum % 11);
    const dvCalc = res === 11 ? "0" : res === 10 ? "K" : String(res);
    if (dvCalc !== dv) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["documentNumber"],
        message: "RUT inválido (dígito verificador incorrecto)",
      });
    }
  }
});

type DocType = "RUT" | "Pasaporte" | "Otro";

const countryOptions = [
  { code: "CL", label: "Chile" },
  { code: "US", label: "United States" },
  { code: "ES", label: "España" },
  { code: "MX", label: "México" },
  { code: "OT", label: "Otro" },
];

const phonePrefixes = [
  { code: "+56", label: "+56 (CL)" },
  { code: "+1", label: "+1 (US/CA)" },
  { code: "+34", label: "+34 (ES)" },
  { code: "+52", label: "+52 (MX)" },
];
const genderOptions = [
  { code: "M", label: "Masculino" },
  { code: "F", label: "Femenino" },
  { code: "O", label: "Otro" },
];

const documentTypeOptions = [
  { code: "RUT", label: "RUT" },
  { code: "Pasaporte", label: "Pasaporte" },
  { code: "Otro", label: "Otro" },
];

interface RegisterForm {
  name: string;
  lastname: string;
  birthday: string;
  country: string;
  phonePrefix: string;
  phoneNumber: string;
  documentType: DocType;
  documentNumber: string;
  gender: string;
  password: string;
  confirmPassword?: string;
  email: string;
  consent: boolean;
}
const { VITE_API_URL } = import.meta.env;

export default function Register() {
  const navigate = useNavigate();
  const {setUser} = useStore();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const response = await fetch(`${VITE_API_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastname: "",
      birthday: "",
      country: "",
      phonePrefix: "+56",
      phoneNumber: "",
      documentType: "RUT",
      documentNumber: "",
      gender: "M",
      password: "",
      confirmPassword: "",
      email: "",
      consent: false,
    },
  });

  // Observar valores para campos condicionales
  const documentType = watch("documentType");
  const consent = watch("consent");

  function onSubmit(data: RegisterForm) {
    console.log('Form data:', data); // Para debug
    const {confirmPassword,birthday, ...submitData} = data;
    // Asegurarnos de que birthday sea una fecha válida antes de formatear
    if (!birthday) {
      console.error('Fecha de nacimiento no válida');
      return;
    }
    try {
      // Convertir de DD-MM-YYYY a YYYY-MM-DD
      const [day, month, year] = birthday.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      const date = new Date(formattedDate);
      
      if (isNaN(date.getTime())) {
        console.error('Fecha de nacimiento no válida');
        return;
      }
      const birthDates = format(date, 'yyyy-MM-dd');
      const payload = {...submitData, birthday: birthDates};
       mutate(payload, {
    onSuccess: (serverResp) => {
      // Construir el objeto user que quieres guardar en el store.
      // Normalmente usarías la respuesta del servidor si devuelve id u otros campos.
      const userToStore = {
        id: serverResp?.id ?? 'user-temp',
        name: payload.name,
        lastname: payload.lastname,
        birthday: payload.birthday,
        country: payload.country,
        phonePrefix: payload.phonePrefix,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        documentType: payload.documentType,
        documentNumber: payload.documentNumber,
        gender: payload.gender,
        consent: payload.consent,
      };
      setUser(userToStore);
      toast.success('Registro exitoso');
      navigate("/");
    },
    onError: (err) => {
     toast.error('Error al registrar el usuario');
    }
  });

    } catch (error) {
      console.error('Error al procesar la fecha:', error);
    }

  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-white">
      <Card className="max-w-3xl p-6 mx-8 mt-10 rounded-md shadow-md md:flex-col md:flex md:items-center md:justify-center">
        <h1 className="mb-6 text-2xl font-semibold text-center">Registro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {/* Nombre */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Nombre</span>
              <Input
                type="text"
                className="mt-2"
                required
                {...register("name")}
              />
            </Label>
            {/* Apellido */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Apellido</span>
              <Input
                type="text"
                className="mt-2"
                required
                {...register("lastname")}
              />
            </Label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {/* Fecha de nacimiento */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                Fecha de nacimiento
              </span>
              <Datepicker
                className="flex justify-center mt-2 item-center"
                placeholder="YYYY-MM-DD"
                onChange={(date) => {
                  const event = {
                    target: { value: date, name: "birthday" },
                    type: "change",
                  };
                  register("birthday").onChange(event);
                }}
              />
            </Label>
            {/* Correo electrónico */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                Correo electrónico
              </span>
              <Input
                type="email"
                className="mt-2"
                required
                {...register("email")}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </Label>

            {/* País de residencia */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                País de residencia
              </span>

              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    aria-label="País de residencia"
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Seleccione un país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {countryOptions.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && (
                <span className="text-xs text-red-500">
                  {errors.country.message}
                </span>
              )}
            </Label>

            {/* Género */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Género</span>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    aria-label="Género"
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Seleccione un género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {genderOptions.map((g) => (
                          <SelectItem key={g.code} value={g.code}>
                            {g.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <span className="text-xs text-red-500">
                  {errors.gender.message}
                </span>
              )}
            </Label>
          </div>

          <div className="grid items-end grid-cols-1 gap-4 sm:grid-cols-1">
            {/* Teléfono */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Teléfono</span>
              <div className="flex items-center gap-2">
                <Controller
                  name="phonePrefix"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      aria-label="Prefijo telefónico"
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="Seleccione un prefijo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {phonePrefixes.map((p) => (
                            <SelectItem key={p.code} value={p.code}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  type="tel"
                  className=""
                  placeholder="Ej: 9 1234 5678"
                  required
                  {...register("phoneNumber")}
                />
              </div>
            </Label>
            {errors.phoneNumber && (
              <span className="text-xs text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}

            {/* Tipo de documento */}
            <Label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                Tipo de documento
              </span>
              <Controller
                name="documentType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    aria-label="Tipo de documento"
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Seleccione un tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {documentTypeOptions.map((d) => (
                          <SelectItem key={d.code} value={d.code}>
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.documentType && (
                <span className="text-xs text-red-500">
                  {errors.documentType.message}
                </span>
              )}
            </Label>

            <div />
            {/* Campos condicionales según tipo de documento */}
            {documentType === "RUT" && (
              <Label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">RUT</span>
                <Controller name="documentNumber" control={control} render={({ field }) => (
                <Input
                  type="text"
                  className="w-full mt-2"
                  placeholder="12.345.678-9"
                  value={field.value}
                  onChange={(e) => {
                    const formatted = formatearRut(e.target.value);
                    field.onChange(formatted);
                  }}
                />
                )}
              />
              {errors.documentNumber && (
                <span className="text-xs text-red-500">
                    {errors.documentNumber.message}
                  </span>
                )}
              </Label>
            )}

            {documentType === "Pasaporte" && (
              <Label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Pasaporte</span>
                <Input
                  type="text"
                  className="w-full mt-2"
                  {...register("documentNumber")}
                />
                {errors.documentNumber && (
                  <span className="text-xs text-red-500">
                    {errors.documentNumber.message}
                  </span>
                )}
              </Label>
            )}

            {documentType === "Otro" && (
              <Label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Otro documento</span>
                <Input
                  type="text"
                  className="w-full mt-2"
                  {...register("documentNumber")}
                />
                {errors.documentNumber && (
                  <span className="text-xs text-red-500">
                    {errors.documentNumber.message}
                  </span>
                )}
              </Label>
            )}
          </div>

          <Label className="flex items-start gap-2">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              )}
            />
            <span className="text-sm">
              Autorizo que los datos sean utilizados para mejorar la usabilidad
              del sitio — solo para análisis.
            </span>
            {errors.consent && (
              <span className="text-xs text-red-500">
                {errors.consent.message}
              </span>
            )}
          </Label>
          {consent && (
            <div className="w-full">
              <Label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Contraseña</span>
                <Input
                  type="password"
                  {...register("password")}
                  className="mt-2"
                  required
                />
                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </Label>
              <Label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">
                  Confirmar contraseña
                </span>
                <Input
                  type="password"
                  {...register("confirmPassword")}
                  className="mt-2"
                  required
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </Label>
            </div>
          )}

          <div className="w-full">
            <Button
              type="submit"
              className="w-full disabled:opacity-50"
              disabled={!consent || !isValid}
            >
              {!isPending || isValid ?  "Registrarse" : isPending && "Registrando..."}
            </Button>
          </div>
        </form>
        {!isPending && error && (
          <p className="mt-4 text-red-500">
            Error al registrar: {String(error.message)}
          </p>
        )}
      </Card>
    </div>
  );
}
