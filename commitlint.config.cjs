const { type } = require("os");

module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Ignora commits de merge automáticos
  ignores: [(msg) => msg.startsWith('Merge ')],
  // Reglas personalizadas
  rules: {
    // --- Tipo de commit ---
    'type-case': [2, 'always', 'lower-case'], // El tipo debe estar en minúsculas
    'type-empty': [2, 'never'], // El tipo no debe estar vacío'
    'type-enum': [
        2,
        'always',
        [
            'build', // Cambios en la construcción del proyecto
            'chore', // Tareas de mantenimiento
            'ci', // Integración continua
            'docs', // Cambios en la documentación
            'feat', // Nuevas características
            'fix', // Correcciones de errores
            'perf', // Mejoras de rendimiento
            'refactor', // Cambios en el código que no afectan la funcionalidad
            'revert', // Reversiones de cambios anteriores
            'style', // Cambios en el estilo del código
            'test' // Cambios relacionados con pruebas
        ]
    ],

    // --- Asunto del commit ---
    'subject-case': [2, 'always', 'lower-case'], // El asunto debe estar en minúsculas
    'subject-empty': [2, 'never'], // El asunto no debe estar vacío
    'subject-full-stop': [2, 'never', '.'] // El asunto no debe terminar con un punto
    }
};
