import { useState } from "react";
import emailjs from "emailjs-com";
import { Notification } from "../components/ui/notification";
import FadeContent from "../components/ui/fadeContent";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showNotification, setShowNotification] = useState(false);

  const contactMethods = [
    {
      icon: "📞",
      title: "Telefone",
      details: ["(11) 99999-9999", "(11) 88888-8888"],
      description: "Atendimento de segunda a sexta, das 8h às 18h"
    },
    {
      icon: "📧",
      title: "Email",
      details: ["contato@dentalcare.com", "agendamento@dentalcare.com"],
      description: "Resposta em até 24 horas"
    },
    {
      icon: "📍",
      title: "Endereço",
      details: ["Rua das Flores, 123", "Vila Madalena - São Paulo/SP", "CEP: 01234-567"],
      description: "Estacionamento gratuito disponível"
    },
    {
      icon: "🕒",
      title: "Horário de Funcionamento",
      details: ["Segunda a Sexta: 8h às 18h", "Sábado: 8h às 12h", "Domingo: Fechado"],
      description: "Emergências: (11) 99999-9999"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        "service_8xjwmb7",
        "template_bzchy44",
        formData,
        "Mppgnw9x94av_vrre"
      );
      setSubmitStatus("success");
      setShowNotification(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch {
      setSubmitStatus("error");
      setShowNotification(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <FadeContent duration={900} easing="ease-out" initialOpacity={0}>
      <div className="space-y-16">
        <Notification
          type={submitStatus === "success" ? "success" : "error"}
          message={
            submitStatus === "success"
              ? "Email enviado com sucesso! Entraremos em contato em breve."
              : submitStatus === "error"
              ? "Erro ao enviar email. Tente novamente ou entre em contato por outro canal."
              : ""
          }
          show={showNotification && submitStatus !== "idle"}
          onClose={() => setShowNotification(false)}
        />
        {/* Hero Section */}
        <section className="text-center py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#042A4C] mb-6">
              Entre em <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#00DAA7] to-[#2A99E7]">Contato conosco</span>
            </h1>
            <p className="text-xl text-slate-500 mb-8 leading-relaxed">
              Estamos aqui para ajudar você! Entre em contato conosco para agendar sua consulta, 
              tirar dúvidas ou solicitar um orçamento personalizado.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-[#2A99E7]">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span className="font-medium">Resposta em até 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💬</span>
                <span className="font-medium">Atendimento Personalizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <span className="font-medium">Soluções Específicas</span>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário e Informações */}
        <section className="grid lg:grid-cols-2 gap-12">
          {/* Formulário de Contato */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 drop-shadow-2xl">
            <h2 className="text-2xl font-bold text-[#042A4C] mb-6">
              Envie sua <span className="text-transparent bg-clip-text bg-[#042A4C]">Mensagem</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-500 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-200 transition-colors bg-slate-50 text-slate-700 placeholder-slate-400"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-500 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-200 transition-colors bg-slate-50 text-slate-700 placeholder-slate-400"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-500 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-200 transition-colors bg-slate-50 text-slate-700 placeholder-slate-400"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-500 mb-2">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-200 transition-colors bg-slate-50 text-slate-700"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="agendamento">Agendamento de Consulta</option>
                    <option value="orcamento">Solicitar Orçamento</option>
                    <option value="duvida">Tirar Dúvidas</option>
                    <option value="emergencia">Emergência</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sl mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-200 transition-colors resize-none bg-slate-50 text-slate-700 placeholder-slate-400"
                  placeholder="Descreva sua necessidade ou dúvida..."
                />
              </div>

              <button
                className="bg-gradient-to-br from-blue-100 via-[#e0e7ef] to-[#f8fafc] rounded-3xl font-bold text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-[#22d3ee] hover:via-[#f1f5f9] hover:to-[#f8fafc] hover:scale-105 hover:ring-2 hover:ring-[#22d3ee] focus:outline-none focus:ring-2 focus:ring-[#22d3ee] text-blue-900/80 drop-shadow-[0_2px_8px_rgba(34,140,255,0.35)]"
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#042A4C] mb-6">
                Informações de <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#00DAA7] to-[#2A99E7]">Contato</span>
              </h2>
              <p className="text-slate-500 mb-8">
                Escolha a forma mais conveniente para entrar em contato conosco. 
                Nossa equipe está pronta para atender você!
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md flex flex-col gap-6">
              {contactMethods.map((method) => (
                <div key={method.title} className="flex items-start gap-4 border-b last:border-b-0 border-slate-100 pb-6 last:pb-0">
                  <span className="text-3xl flex-shrink-0">{method.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#042A4C] mb-1">{method.title}</h3>
                    <div className="text-slate-500 text-sm">
                      {method.details.map((detail, i) => (
                        <div key={i}>{detail}</div>
                      ))}
                    </div>
                    <div className="text-[#2A99E7] text-xs mt-2">{method.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mapa e Localização */}
        <section className="bg-white rounded-3xl p-8 border-1 border-slate-200 drop-shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#042A4C] mb-4">
              Nossa <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#00DAA7] to-[#2A99E7]">Localização</span>
            </h2>
            <p className="text-lg text-slate-500">
              Venha nos visitar! Estamos localizados em uma região de fácil acesso com estacionamento gratuito.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6">
            <div className="rounded-lg flex items-center justify-center">    
                <p className="text-2xl text-[#042A4C] drop-shadow-2xl">Rua das Flores, 123 - Vila Madalena, São Paulo/SP</p>
            </div>
            
          </div>
        </section>

        {/* FAQ Rápido */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#042A4C] mb-4">
              Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#00DAA7] to-[#2A99E7]">Frequentes</span>
            </h2>
            <p className="text-lg text-slate-500">
              Respostas rápidas para as dúvidas mais comuns.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br via-[#2A99E7] to-[#00DAA7] from-[#042A4C] rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-100 mb-3">Como agendar uma consulta?</h3>
              <p className="text-slate-100 text-sm">
                Você pode agendar através do telefone, WhatsApp, email ou preenchendo o formulário acima. 
                Nossa equipe entrará em contato para confirmar o horário.
              </p>
            </div>
            
            <div className="bg-gradient-to-br via-[#2A99E7] to-[#00DAA7] from-[#042A4C] rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-100 mb-3">Aceitam convênios?</h3>
              <p className="text-slate-100 text-sm">
                Sim! Trabalhamos com os principais convênios odontológicos. 
                Entre em contato para verificar se o seu convênio está na lista.
              </p>
            </div>
            
            <div className="bg-gradient-to-br via-[#2A99E7] to-[#00DAA7] from-[#042A4C] rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-100 mb-3">Qual o prazo para resposta?</h3>
              <p className="text-slate-100 text-sm">
                Respondemos em até 24 horas em dias úteis. Para emergências, 
                temos um número específico disponível 24/7.
              </p>
            </div>
            
            <div className="bg-gradient-to-br via-[#2A99E7] to-[#00DAA7] from-[#042A4C] rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-100 mb-3">Fazem atendimento de emergência?</h3>
              <p className="text-slate-100 text-sm">
                Sim! Para emergências odontológicas, temos um número específico 
                que funciona 24 horas por dia, 7 dias por semana.
              </p>
            </div>
          </div>
        </section>
      </div>
    </FadeContent>
  );
};

export default Contact;
