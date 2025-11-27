import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TermsCheckbox } from './TermsCheckbox';

describe('TermsCheckbox', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<TermsCheckbox checked={false} onChange={mockOnChange} />);
    
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Acepto los')).toBeInTheDocument();
    expect(screen.getByText('términos y condiciones')).toBeInTheDocument();
  });

  it('handles checkbox change correctly', () => {
    render(<TermsCheckbox checked={false} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('displays correct checked state', () => {
    render(<TermsCheckbox checked={true} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<TermsCheckbox checked={false} onChange={mockOnChange} className={customClass} />);
    
    const container = screen.getByRole('checkbox').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('has correct link attributes', () => {
    render(<TermsCheckbox checked={false} onChange={mockOnChange} />);
    
    const link = screen.getByText('términos y condiciones');
    expect(link).toHaveAttribute('href', '/terminos-y-condiciones.pdf');
    expect(link).toHaveAttribute('target', '_blank');
  });
}); 