import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const HomeScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            concave_points_worst: '',
            perimeter_worst: '',
            concave_points_mean: '',
            radius_worst: '',
            perimeter_mean: '',
        },
    });
    const [prediction, setPrediction] = useState<number | null>(null);

    const onSubmit = async (data: any) => {
        try {
            // Converte os valores dos campos do formulário para números antes de enviar
            const requestData = {
                concave_points_worst: parseFloat(data.concave_points_worst),
                perimeter_worst: parseFloat(data.perimeter_worst),
                concave_points_mean: parseFloat(data.concave_points_mean),
                radius_worst: parseFloat(data.radius_worst),
                perimeter_mean: parseFloat(data.perimeter_mean),
            };
    
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
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
            <Text>Pontos Côncavos Pior</Text>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Pontos Côncavos Pior"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="concave_points_worst"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.concave_points_worst && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Texture Mean */}
            <Text>Perímetro Pior</Text>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Perímetro Pior"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="perimeter_worst"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.perimeter_worst && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Perimeter Mean */}
            <Text>Pontos Côncavos Médio</Text>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Pontos Côncavos Medio"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="concave_points_mean"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.concave_points_mean && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Area Mean */}
            <Text>Raio Pior</Text>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Raio Pior"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                )}
                name="radius_worst"
                rules={{ required: true, pattern: /^[0-9]+([,.][0-9]+)?$/ }}
            />
            {errors.radius_worst && <Text style={styles.error}>Este campo é obrigatório e deve ser numérico.</Text>}

            {/* Smoothness Mean */}
            <Text>Perímetro Médio</Text>
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
