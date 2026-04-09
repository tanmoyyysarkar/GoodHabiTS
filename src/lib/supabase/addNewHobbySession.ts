import { supabase } from './supabase';

const addNewHobbySession = async (
  hobby_id: string,
  feeling: number,
  session_date: string,
  notes: string,
  minutes_logged: number
) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert([
        {
          hobby_id,
          feeling,
          session_date,
          notes,
          minutes_logged,
        },
      ])
      .select()
      .single();
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unexpected error occured during adding a new session please try again later';
    return { success: false as const, errorMessage };
  }
};

export default addNewHobbySession;
