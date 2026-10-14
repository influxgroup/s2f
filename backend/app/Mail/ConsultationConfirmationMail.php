<?php

namespace App\Mail;

use App\Models\Consultation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConsultationConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Consultation $consultation)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Technical Discovery Session Booked - Sovereign2Fresh Empire',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.consultation_client',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
