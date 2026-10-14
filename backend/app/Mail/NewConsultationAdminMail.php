<?php

namespace App\Mail;

use App\Models\Consultation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewConsultationAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Consultation $consultation)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New Technical Discovery Booking: {$this->consultation->company_name} - Sovereign2Fresh Empire",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.consultation_admin',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
