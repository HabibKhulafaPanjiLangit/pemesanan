import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      businessName,
      whatsapp,
      email,
      websiteTypes,
      pageCount,
      logoStatus,
      photoStatus,
      domain,
      hostingStatus,
      mainColor,
      referenceWebsite,
      specialNotes
    } = body;

    if (!fullName || !businessName || !whatsapp || !email || !pageCount || !domain) {
      return NextResponse.json(
        { error: 'Field yang wajib diisi tidak boleh kosong' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    const whatsappRegex = /^[\d\s\-\+\(\)]+$/;
    if (!whatsappRegex.test(whatsapp)) {
      return NextResponse.json(
        { error: 'Format nomor WhatsApp tidak valid' },
        { status: 400 }
      );
    }

    if (!websiteTypes || !Array.isArray(websiteTypes) || websiteTypes.length === 0) {
      return NextResponse.json(
        { error: 'Pilih minimal satu jenis website' },
        { status: 400 }
      );
    }

    const orderData = {
      id: `ORD-${Date.now()}`,
      fullName: fullName.trim(),
      businessName: businessName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim().toLowerCase(),
      websiteTypes,
      pageCount: pageCount.trim(),
      logoStatus: logoStatus || '',
      photoStatus: photoStatus || '',
      domain: domain.trim(),
      hostingStatus: hostingStatus || '',
      mainColor: mainColor?.trim() || '',
      referenceWebsite: referenceWebsite?.trim() || '',
      specialNotes: specialNotes?.trim() || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('🚀 NEW ORDER:', JSON.stringify(orderData, null, 2));

    const notificationMessage = `
🚀 NEW WEBSITE ORDER - MEOWLABS.ID

📋 Order Details:
• Order ID: ${orderData.id}
• Full Name: ${fullName}
• Business: ${businessName}
• WhatsApp: ${whatsapp}
• Email: ${email}

🌐 Website Requirements:
• Types: ${websiteTypes.join(', ')}
• Pages: ${pageCount}
• Logo: ${logoStatus || 'Not specified'}
• Photos: ${photoStatus || 'Not specified'}
• Domain: ${domain}
• Hosting: ${hostingStatus || 'Not specified'}

🎨 Design Preferences:
• Colors: ${mainColor || 'Not specified'}
• Reference: ${referenceWebsite || 'Not specified'}
• Notes: ${specialNotes || 'None'}

📅 Date: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
    `.trim();

    console.log('🔔 Notification:', notificationMessage);

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Pemesanan berhasil disimpan',
      orderId: orderData.id,
      data: orderData
    });

  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan pemesanan' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Orders API endpoint',
    version: '1.0.0'
  });
}