import { ShieldCheck, Zap, Headphones, CreditCard } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      title: "100% Secure",
      desc: "Bank-grade encryption for every transaction."
    },
    {
      icon: <Zap className="w-10 h-10 text-green-500" />,
      title: "Instant Delivery",
      desc: "QR codes sent directly to your wallet in seconds."
    },
    {
      icon: <CreditCard className="w-10 h-10 text-green-500" />,
      title: "Easy Payments",
      desc: "Support for all major cards and digital wallets."
    },
    {
      icon: <Headphones className="w-10 h-10 text-green-500" />,
      title: "24/7 Support",
      desc: "Our dedicated team is always here to help you."
    }
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-green-500/30 transition-colors">
              <div className="mb-4 bg-green-500/10 w-fit p-3 rounded-xl">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}