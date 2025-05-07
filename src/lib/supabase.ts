import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vdnwbhqxooxwuxjgnmkp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbndiaHF4b294d3V4amdubWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MTU3NDAsImV4cCI6MjA2MjE5MTc0MH0.WLy6LgUX4VE2gxcBGJAoMdbEtWnrt42wHsI4CDTFmH0';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase configuration');
    throw new Error('Supabase configuration is required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    },
    global: {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    },
});

// Test connection
const testConnection = async () => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('count');
        
        if (error) {
            console.error('Supabase connection error:', error.message);
        } else {
            console.log('✅ Supabase connected successfully', data);
        }
    } catch (err) {
        console.error('Failed to connect to Supabase:', err);
    }
};

// Don't block rendering with the test
setTimeout(testConnection, 0);

export type Profile = {
    id: string;
    wallet_address: string;
    username: string;
    created_at: string;
}; 