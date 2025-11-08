// Función para limpiar el RUT de puntos y guiones
function limpiarRut(rut: string): string {
    return rut.replace(/[^0-9kK]/g, '').toUpperCase();
}

// Función para calcular el dígito verificador
function calcularDigitoVerificador(rut: string): string {
    const rutLimpio = limpiarRut(rut);
    const rutNumeros = rutLimpio.slice(0, -1);
    let suma = 0;
    let multiplicador = 2;
    for (let i = rutNumeros.length - 1; i >= 0; i--) {
        suma += parseInt(rutNumeros.charAt(i), 10) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resto = suma % 11;
    const dvCalculado = 11 - resto;
    if (dvCalculado === 11) return '0';
    if (dvCalculado === 10) return 'K';
    return dvCalculado.toString();
}

// Función principal para validar el RUT
export function validarRut(rut: string): boolean {
    if (!rut) return false;
    const rutLimpio = limpiarRut(rut);
    if (rutLimpio.length < 8) return false;
    const rutNumeros = rutLimpio.slice(0, -1);
    const dvUsuario = rutLimpio.slice(-1);
    const dvCalculado = calcularDigitoVerificador(rutLimpio);
    return dvUsuario === dvCalculado;
}

// Función para formatear el RUT
export function formatearRut(rut: string): string {
    if (!rut) return '';
    const rutLimpio = limpiarRut(rut);
    let resultado = rutLimpio.slice(-4, -1) + '-' + rutLimpio.slice(-1);
    let rutNumeros = rutLimpio.slice(0, -4);
    while (rutNumeros.length > 0) {
        resultado = rutNumeros.slice(-3) + '.' + resultado;
        rutNumeros = rutNumeros.slice(0, -3);
    }
    return resultado;
}
