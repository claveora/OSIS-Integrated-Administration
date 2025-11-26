// OSINTRA Theme Configuration
export const theme = {
    colors: {
        primary: '#1E3A8A',      // Navy OSIS
        secondary: '#FFD700',    // Kuning Emas
        accent: '#E5E7EB',       // Abu lembut
        text: '#111827',         // Abu tua
        buttonHover: {
            from: '#1E40AF',
            to: '#2563EB',
        },
    },
    borderRadius: '1.2rem',
    fonts: {
        primary: 'Inter, sans-serif',
        secondary: 'Poppins, sans-serif',
    },
};

export const gradientButton = `bg-gradient-to-r from-[${theme.colors.buttonHover.from}] to-[${theme.colors.buttonHover.to}]`;
