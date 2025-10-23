'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, CheckCircle, Globe, Palette, Server, Zap, Star, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Data Pemesan
    fullName: '',
    businessName: '',
    whatsapp: '',
    email: '',
    
    // Jenis Website
    websiteTypes: [] as string[],
    
    // Informasi Konten
    pageCount: '',
    logoStatus: '',
    photoStatus: '',
    
    // Domain & Hosting
    domain: '',
    hostingStatus: '',
    
    // Desain & Referensi
    mainColor: '',
    referenceWebsite: '',
    specialNotes: ''
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWebsiteTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      websiteTypes: checked 
        ? [...prev.websiteTypes, type]
        : prev.websiteTypes.filter(t => t !== type)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.websiteTypes.length === 0) {
      toast.error('Pilih minimal satu jenis website');
      return;
    }

    if (!formData.logoStatus) {
      toast.error('Pilih status logo (sudah ada atau minta dibuatkan)');
      return;
    }

    if (!formData.photoStatus) {
      toast.error('Pilih status foto produk/layanan');
      return;
    }

    if (!formData.domain) {
      toast.error('Pilih ekstensi domain yang diinginkan');
      return;
    }

    if (!formData.hostingStatus) {
      toast.error('Pilih status hosting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Siapkan pesan WhatsApp
      const whatsappMessage = `*PEMESANAN WEBSITE BARU - MEOWLABS.ID*
━━━━━━━━━━━━━━━━━━━━━

*DATA PEMESAN*
👤 Nama: ${formData.fullName}
🏢 Nama Usaha: ${formData.businessName}
📱 WhatsApp: ${formData.whatsapp}
📧 Email: ${formData.email}

*JENIS WEBSITE*
${formData.websiteTypes.map(type => `✓ ${type}`).join('\n')}

*INFORMASI KONTEN*
📄 Jumlah Halaman: ${formData.pageCount || 'Belum ditentukan'}
🎨 Logo: ${formData.logoStatus}
📸 Foto Produk/Layanan: ${formData.photoStatus}

*DOMAIN & HOSTING*
🌐 Domain: ${formData.domain}
🖥️ Hosting: ${formData.hostingStatus}

*DESAIN & PREFERENSI*
🎨 Warna Utama: ${formData.mainColor || 'Belum ditentukan'}
🔗 Referensi Website: ${formData.referenceWebsite || '-'}

*CATATAN KHUSUS*
${formData.specialNotes || '-'}

━━━━━━━━━━━━━━━━━━━━━
_Pemesanan dikirim dari Form Meowlabs.id_`;

      // Encode message untuk URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/6281223648245?text=${encodedMessage}`;
      
      // Simpan ke database di background (optional)
      fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch(err => console.log('Background save failed:', err));
      
      // Langsung buka WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Set sukses
      setIsSubmitted(true);
      toast.success('Mengarahkan ke WhatsApp...');
      
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Terjadi kesalahan, silakan coba lagi');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-gray-900 border-green-500/30">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-green-500/20 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-400 mb-4">Pemesanan Berhasil!</h1>
            <p className="text-gray-300 mb-6">
              Terima kasih telah memesan website di Meowlabs.id. Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  businessName: '',
                  whatsapp: '',
                  email: '',
                  websiteTypes: [],
                  pageCount: '',
                  logoStatus: '',
                  photoStatus: '',
                  domain: '',
                  hostingStatus: '',
                  mainColor: '',
                  referenceWebsite: '',
                  specialNotes: ''
                });
              }}
              className="bg-green-600 hover:bg-green-700 text-black font-semibold"
            >
              Buat Pemesanan Baru
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400">
      {/* Header */}
      <header className="border-b border-green-500/20 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-green-400">Meowlabs.id</h1>
            </div>
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              Professional Web Development
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center mb-12">
          <Badge className="mb-4 bg-green-600/20 text-green-400 border-green-500/30">
            🚀 Modern & Advanced Web Solutions
          </Badge>
          <h2 className="text-5xl font-bold text-green-400 mb-4">
            Buat Website Impian Anda
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transformasi digital untuk bisnis Anda dengan website modern, cepat, dan profesional
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 text-green-400">
              <Star className="w-5 h-5 fill-current" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Globe className="w-5 h-5" />
              <span>Global Standard</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Zap className="w-5 h-5" />
              <span>Lightning Fast</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-900 border-green-500/30 shadow-2xl shadow-green-500/10">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-green-400">
                Form Pemesanan Website
              </CardTitle>
              <CardDescription className="text-gray-400">
                Lengkapi form di bawah ini untuk memulai proyek website Anda
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Data Pemesan */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-green-400">Data Pemesan</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-green-400">Nama Lengkap</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-green-400">Nama Usaha/Brand</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20"
                        placeholder="PT. Example"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-green-400">Nomor WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20"
                        placeholder="+62 812-3456-7890"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-green-400">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-green-500/20" />

                {/* Jenis Website */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-green-400">Jenis Website</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'company-profile', label: 'Company Profile', icon: Globe },
                      { id: 'e-commerce', label: 'E-Commerce', icon: Server },
                      { id: 'portfolio', label: 'Portfolio', icon: Palette },
                      { id: 'blog', label: 'Blog', icon: Server }
                    ].map((type) => (
                      <div key={type.id} className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-green-500/20 hover:border-green-400/50 transition-colors">
                        <Checkbox
                          id={type.id}
                          checked={formData.websiteTypes.includes(type.id)}
                          onCheckedChange={(checked) => handleWebsiteTypeChange(type.id, checked as boolean)}
                          className="border-green-500/50 text-green-400 focus:ring-green-400/20"
                        />
                        <type.icon className="w-5 h-5 text-green-400" />
                        <Label htmlFor={type.id} className="text-green-400 cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-green-500/20" />

                {/* Informasi Konten */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-green-400">Informasi Konten</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pageCount" className="text-green-400">Jumlah Halaman</Label>
                      <Input
                        id="pageCount"
                        value={formData.pageCount}
                        onChange={(e) => handleInputChange('pageCount', e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20"
                        placeholder="Home, Tentang, Produk, Kontak"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-green-400">Logo</Label>
                      <RadioGroup
                        value={formData.logoStatus}
                        onValueChange={(value) => handleInputChange('logoStatus', value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ada" id="logo-ada" className="border-green-500/50 text-green-400" />
                          <Label htmlFor="logo-ada" className="text-green-400">Sudah ada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buat" id="logo-buat" className="border-green-500/50 text-green-400" />
                          <Label htmlFor="logo-buat" className="text-green-400">Minta dibuatkan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-green-400">Foto Produk/Layanan</Label>
                      <RadioGroup
                        value={formData.photoStatus}
                        onValueChange={(value) => handleInputChange('photoStatus', value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ada" id="photo-ada" className="border-green-500/50 text-green-400" />
                          <Label htmlFor="photo-ada" className="text-green-400">Sudah ada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buat" id="photo-buat" className="border-green-500/50 text-green-400" />
                          <Label htmlFor="photo-buat" className="text-green-400">Minta dibuatkan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <Separator className="bg-green-500/20" />

                {/* Domain & Hosting */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-semibold text-green-400">Domain & Hosting</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="domain" className="text-green-400">Domain</Label>
                      <Select value={formData.domain} onValueChange={(value) => handleInputChange('domain', value)}>
                        <SelectTrigger className="bg-gray-800 border-green-500/30 text-green-400 focus:border-green-400 focus:ring-green-400/20">
                          <SelectValue placeholder="Pilih domain" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-green-500/30">
                          <SelectItem value="my.id" className="text-green-400">.my.id</SelectItem>
                          <SelectItem value="com" className="text-green-400">.com</SelectItem>
                          <SelectItem value="id" className="text-green-400">.id</SelectItem>
                          <SelectItem value="net" className="text-green-400">.net</SelectItem>
                          <SelectItem value="org" className="text-green-400">.org</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-green-400">Hosting</Label>
                      <RadioGroup
                        value={formData.hostingStatus}
                        onValueChange={(value) => handleInputChange('hostingStatus', value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ada" id="hosting-ada" className="border-green-500/50 text-green-400" />
                          <Label htmlFor="hosting-ada" className="text-green-400">Sudah ada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buat" id="hosting-buat" className="border-green-500/50 text-green-400" />
                          <Label htmlFor="hosting-buat" className="text-green-400">Minta dibuatkan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <Separator className="bg-green-500/20" />

                {/* Desain & Referensi */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold">5</span>
                    </div>
                    <h3 className="text-xl font-semibold text-green-400">Desain & Referensi</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mainColor" className="text-green-400">Warna utama yang diinginkan</Label>
                      <Input
                        id="mainColor"
                        value={formData.mainColor}
                        onChange={(e) => handleInputChange('mainColor', e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20"
                        placeholder="Hitam, Hijau, Putih"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="referenceWebsite" className="text-green-400">Referensi website</Label>
                      <Input
                        id="referenceWebsite"
                        value={formData.referenceWebsite}
                        onChange={(e) => handleInputChange('referenceWebsite', e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialNotes" className="text-green-400">Catatan khusus</Label>
                    <Textarea
                      id="specialNotes"
                      value={formData.specialNotes}
                      onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-green-400 placeholder-green-500/50 focus:border-green-400 focus:ring-green-400/20 min-h-[100px]"
                      placeholder="Fitur tambahan, request desain, dll"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold py-4 text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pemesanan
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 bg-gray-900/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-green-400 font-bold">Meowlabs.id</span>
          </div>
          <p className="text-gray-400">
            © 2024 Meowlabs.id. Professional Web Development Services.
          </p>
        </div>
      </footer>
    </div>
  );
}