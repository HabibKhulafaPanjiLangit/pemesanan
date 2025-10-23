import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validasi data yang diterima
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

    // Validasi field yang wajib diisi
    if (!fullName || !businessName || !whatsapp || !email || !pageCount || !domain) {
      return NextResponse.json(
        { error: 'Field yang wajib diisi tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Validasi format WhatsApp (sederhana)
    const whatsappRegex = /^[\d\s\-\+\(\)]+$/;
    if (!whatsappRegex.test(whatsapp)) {
      return NextResponse.json(
        { error: 'Format nomor WhatsApp tidak valid' },
        { status: 400 }
      );
    }

    // Simpan data ke database
    const order = await db.websiteOrder.create({
      data: {
        fullName: fullName.trim(),
        businessName: businessName.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim().toLowerCase(),
        websiteTypes: JSON.stringify(websiteTypes || []),
        pageCount: pageCount.trim(),
        logoStatus: logoStatus || '',
        photoStatus: photoStatus || '',
        domain: domain.trim(),
        hostingStatus: hostingStatus || '',
        mainColor: mainColor?.trim() || null,
        referenceWebsite: referenceWebsite?.trim() || null,
        specialNotes: specialNotes?.trim() || null,
        status: 'pending'
      }
    });

    // Kirim notifikasi menggunakan z-ai-web-dev-sdk (opsional)
    try {
      const ZAI = await import('z-ai-web-dev-sdk');
      const zai = await ZAI.create();

      // Buat pesan notifikasi
      const notificationMessage = `
🚀 NEW WEBSITE ORDER - MEOWLABS.ID

📋 Order Details:
• Order ID: ${order.id}
• Full Name: ${fullName}
• Business: ${businessName}
• WhatsApp: ${whatsapp}
• Email: ${email}

🌐 Website Requirements:
• Types: ${websiteTypes.join(', ') || 'Not specified'}
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

      // Kirim notifikasi (simulasi - bisa disesuaikan dengan kebutuhan)
      console.log('🔔 Order Notification:', notificationMessage);
      
    } catch (notificationError) {
      console.error('Failed to send notification:', notificationError);
      // Tetap lanjutkan meskipun notifikasi gagal
    }

    return NextResponse.json({
      success: true,
      message: 'Pemesanan berhasil disimpan',
      orderId: order.id
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
  try {
    // Endpoint untuk melihat semua pesanan (admin only)
    const orders = await db.websiteOrder.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        fullName: true,
        businessName: true,
        email: true,
        whatsapp: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      success: true,
      orders: orders.map(order => ({
        ...order,
        websiteTypes: JSON.parse(order.websiteTypes || '[]')
      }))
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pesanan' },
      { status: 500 }
    );
  }
}