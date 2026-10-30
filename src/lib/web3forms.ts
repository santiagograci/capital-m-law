export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "5016c474-f540-41cf-835e-6b8cf3bba931";

export interface Web3FormsContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function submitWeb3ContactForm(
  payload: Web3FormsContactPayload
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nueva Consulta Web: ${payload.service || "General"} - ${payload.name}`,
        from_name: "Web Capital M Law",
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "",
        service: payload.service || "General",
        message: payload.message,
      }),
    });

    const data = await response.json();

    if (response.ok && data?.success === true) {
      return { success: true, message: data.message };
    }

    return {
      success: false,
      message:
        data?.message ||
        "No se pudo enviar el formulario. Por favor intenta por WhatsApp.",
    };
  } catch (error) {
    console.error("[Web3Forms] Error sending contact form:", error);
    return {
      success: false,
      message:
        "Error de conexión al enviar el mensaje. Por favor contáctanos directamente por WhatsApp.",
    };
  }
}
