import React, { ErrorInfo } from 'react';
import { View, Text } from 'react-native';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [errorState, setErrorState] = React.useState<ErrorBoundaryState>({
        hasError: false,
        error: null,
    });

    const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
        // Vous pouvez ici enregistrer l'erreur dans un service de journalisation
        console.error(error, errorInfo);
        setErrorState({
            hasError: true,
            error: error,
        });
    };

    if (errorState.hasError) {
        return (
            <View>
                <Text>Une erreur s'est produite</Text>
                {/* Vous pouvez personnaliser l'affichage de l'erreur */}
                <Text>{errorState.error?.message}</Text>
            </View>
        );
    }

    return <React.Fragment>{children}</React.Fragment>;
};

export default ErrorBoundary;
