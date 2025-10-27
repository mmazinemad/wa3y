
import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Phone, Mail, Send, Facebook, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import { wa3iSocial } from '@/constants';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const userId = import.meta.env.VITE_EMAILJS_USER_ID;

export const ContactUs = () => {
    const form = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            setIsSending(true);
            // Replace with your EmailJS service ID, template ID, and user ID
            emailjs.sendForm(serviceId, templateId, form.current, userId)
                .then((result) => {
                    console.log(result.text);
                    toast.success('تم إرسال الرسالة بنجاح!');
                    form.current?.reset();
                }, (error) => {
                    console.log(error.text);
                    toast.error('فشل إرسال الرسالة. الرجاء المحاولة مرة أخرى لاحقًا.');
                })
                .finally(() => {
                    setIsSending(false);
                });
        }
    };

    return (
        <section id='contactUs' className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        تواصل معنا
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        هل لديك أسئلة؟ يسعدنا أن نسمع منك.
                    </p>
            </div>
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-primary rounded-3xl p-12 text-white">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-right">
                        {/* Contact Form */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h3>
                            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="user_name" className="text-white">الاسم</Label>
                                    <Input id="user_name" name="user_name" type="text" placeholder="اسمك" required className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="user_email" className="text-white">البريد الإلكتروني</Label>
                                    <Input id="user_email" name="user_email" type="email" placeholder="بريدك الإلكتروني" required className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-white">الرسالة</Label>
                                    <Textarea id="message" name="message" placeholder="رسالتك" required className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white h-32" />
                                </div>
                                <Button type="submit" variant="secondary" size="lg" className="w-full text-lg" disabled={isSending}>
                                    <Send className="w-5 h-5 mr-2" />
                                    {isSending ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                           <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>
                           <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6"/>
                                <span className="text-lg" dir="ltr">{wa3iSocial.phone}</span>
                           </div>
                           <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6"/>
                                <span className="text-lg" dir="ltr">{wa3iSocial.phone2}</span>
                           </div>
                           <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6"/>
                                <a href={"mailto:" + wa3iSocial.mail} className="text-lg">{wa3iSocial.mail}</a>
                           </div>

                           <h3 className="text-2xl font-bold mb-6 mt-12">تابعنا</h3>
                           <div className="flex gap-6 justify-start">
                                <a href={wa3iSocial?.facebookPage} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                    <Facebook className="w-8 h-8" />
                                </a>
                                <a href={wa3iSocial?.x} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                    <Twitter className="w-8 h-8" />
                                </a>
                                <a href={wa3iSocial.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                    <Linkedin className="w-8 h-8" />
                                </a>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
