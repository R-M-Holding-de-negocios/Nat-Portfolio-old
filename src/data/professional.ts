const whatsappNumber = '557588634101';
// Neutral prefilled text: the visitor reviews and decides whether to send it.
const whatsappMessage = 'Olá, Natália! Gostaria de saber mais sobre o atendimento online.';

export const professional = {
  name: 'Natália Menezes Reis',
  displayName: 'Natália Menezes',
  role: 'Psicóloga Clínica',
  crp: '03/35648',
  phone: '(75) 8863-4101',
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagram: '@psi.natmenezes',
  instagramUrl: 'https://www.instagram.com/psi.natmenezes/',
  email: 'Natreis.psi@gmail.com',
  emailUrl: 'mailto:Natreis.psi@gmail.com',
} as const;
