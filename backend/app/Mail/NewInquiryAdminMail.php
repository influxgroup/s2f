<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewInquiryAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Inquiry $inquiry)
    {
    }

    public function envelope(): Envelope
    {
        $senderIdentifier = $this->inquiry->company ?: $this->inquiry->name;
        return new Envelope(
            subject: "New Enterprise Inquiry from {$senderIdentifier} - Sovereign2Fresh Empire",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.inquiry_admin',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
