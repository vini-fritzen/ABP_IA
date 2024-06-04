import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = () => {
    const [formData, setFormData] = useState({
        radius_mean: '',
        texture_mean: '',
        perimeter_mean: '',
        area_mean: '',
        smoothness_mean: '',
    });
    const [prediction, setPrediction] = useState<number | null>(null);

    const handleInputChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                setPrediction(data.prediction);
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
            {['radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean'].map((field) => (
                <TextInput
                    key={field}
                    style={styles.input}
                    placeholder={field.replace('_', ' ')}
                    value={formData[field as keyof typeof formData]}
                    onChangeText={(value) => handleInputChange(field, value)}
                    keyboardType="numeric"
                />
            ))}
            <Button title="Enviar" onPress={handleSubmit} />
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
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default HomeScreen;
