import { useState } from 'react';
import { createClient } from '../utils/supabase/client'; // Adjust the path as necessary

export const useSupabaseAuth = () => {
    const supabase = createClient();
    const [error, setError] = useState('');

    const signUp = async ({ email, password, name }) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name } // Storing additional data, adjust according to your needs
            }
        });

        if (error) {
            setError(error.message);
        } else {
            setError(''); // Reset error if sign up is successful
        }

        return !error;
    };

    const signIn = async ({ email, password }) => {
        const { error } = await supabase.auth.signIn({
            email,
            password
        });

        if (error) {
            setError(error.message);
        } else {
            setError(''); // Reset error if sign in is successful
        }

        return !error;
    };

    return { signIn, signUp, error };
};
