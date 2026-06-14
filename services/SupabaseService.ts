export class SupabaseService {
  private static client: any = null;

  static getClient() {
    // Agar client pehle se bana hua hai toh wahi return karo
    if (this.client) {
      return this.client;
    }

    // Safety Check: Check agar CDN se Supabase load hua hai ya nahi
    if (typeof (window as any).supabase === 'undefined') {
      console.error("CRITICAL: Supabase CDN script is not loaded yet or blocked.");
      return null;
    }

    // Naya client banao using your exact keys[span_0](start_span)[span_0](end_span)
    this.client = (window as any).supabase.createClient(
      "https://rqorglbbcaupaskaronb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb3JnbGJiY2F1cGFza2Fyb25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMTQ0MTMsImV4cCI6MjA5Njg5MDQxM30.ViB8Jzu9FNubHcWhrxpnjfvXp8hMjy_zbkPiCtQ6opw"
    );

    return this.client;
  }
}
