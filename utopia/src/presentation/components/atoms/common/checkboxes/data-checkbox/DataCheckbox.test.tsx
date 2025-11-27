import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataCheckbox } from './DataCheckbox';

describe('DataCheckbox', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<DataCheckbox checked={false} onChange={mockOnChange} />);
    
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Autorizo el tratamiento de mis datos')).toBeInTheDocument();
  });

  it('handles checkbox change correctly', () => {
    render(<DataCheckbox checked={false} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('displays correct checked state', () => {
    render(<DataCheckbox checked={true} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<DataCheckbox checked={false} onChange={mockOnChange} className={customClass} />);
    
    const container = screen.getByRole('checkbox').parentElement;
    expect(container).toHaveClass(customClass);
  });
}); 