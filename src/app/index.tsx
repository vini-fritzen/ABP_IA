import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const HomeScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            radius_mean: '',
            texture_mean: '',
            perimeter_mean: '',
            area_mean: '',
            smoothness_mean: '',
        },
    });
    const [prediction, setPrediction] = useState<number | null>(null);

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseData = await response.json();
                setPrediction(responseData.prediction);
            } else {
                console.error('Erro ao enviar dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Predição de Câncer de Mama</Text>

            {/* Radius Mean */}
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Raio Médio"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="radius_mean"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.radius_mean && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Texture Mean */}
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Textura Média"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="texture_mean"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.texture_mean && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Perimeter Mean */}
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Perímetro Médio"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="perimeter_mean"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.perimeter_mean && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Area Mean */}
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Área Média"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="area_mean"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.area_mean && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Smoothness Mean */}
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Suavidade Média"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="smoothness_mean"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.smoothness_mean && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Enviar</Text>
            </Pressable>
            {prediction !== null && (
                <Text style={styles.result}>Predição: {prediction > 0.5 ? 'Maligno' : 'Benigno'}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
    },
});

export default HomeScreen;
