import { supabase } from "@/lib/supabase/supabase";
import { makeRedirectUri } from "expo-auth-session";

const resetPassword = async (email: string) => {
    const redirectTo = makeRedirectUri({
        scheme: "good-habits",
        path: "auth/reset-password"
    })

    try {
        const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo
        });

        if(error){
            return {success: false as const, errorMessage: error.message}
        }
        return {success: true as const, data}
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unexpected error while sending reset password link"
        return {success: false as const, errorMessage}
    }
}

export default resetPassword;
