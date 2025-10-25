import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('renders footer content', () => {
    render(<Footer />);
    
    expect(screen.getByText(/ASOG.DEV/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument();
  });

  it('has a scroll to top button', () => {
    render(<Footer />);
    
    const scrollButton = screen.getByLabelText(/scroll to top/i);
    expect(scrollButton).toBeInTheDocument();
  });

  it('scrolls to top when button is clicked', () => {
    // Mock window.scrollTo
    const scrollToMock = vi.fn();
    global.scrollTo = scrollToMock;

    render(<Footer />);
    
    const scrollButton = screen.getByLabelText(/scroll to top/i);
    fireEvent.click(scrollButton);
    
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
