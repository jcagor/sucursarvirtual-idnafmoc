import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageUploader } from './ImageUploader';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('ImageUploader', () => {
  const mockOnImageChange = jest.fn();
  const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<ImageUploader imagePreview={null} onImageChange={mockOnImageChange} />);
    
    expect(screen.getByText('Haz clic o arrastra una imagen aquí')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders image preview when provided', () => {
    const previewUrl = 'data:image/png;base64,test';
    render(<ImageUploader imagePreview={previewUrl} onImageChange={mockOnImageChange} />);
    
    const preview = screen.getByRole('img');
    expect(preview).toHaveAttribute('src', previewUrl);
  });

  it('handles file input change', () => {
    render(<ImageUploader imagePreview={null} onImageChange={mockOnImageChange} />);
    
    const input = screen.getByLabelText('Haz clic o arrastra una imagen aquí');
    fireEvent.change(input, { target: { files: [mockFile] } });
    
    expect(mockOnImageChange).toHaveBeenCalledWith(mockFile);
  });

  it('displays disabled state correctly', () => {
    render(
      <ImageUploader
        imagePreview={null}
        onImageChange={mockOnImageChange}
        isDisabled={true}
        disabledMessage="Custom disabled message"
      />
    );
    
    expect(screen.getByText('Custom disabled message')).toBeInTheDocument();
    const input = screen.getByLabelText('Custom disabled message');
    expect(input).toBeDisabled();
    
    const label = screen.getByText('Custom disabled message').closest('label');
    expect(label).toHaveClass('opacity-50', 'cursor-not-allowed', 'bg-principal-100');
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(
      <ImageUploader
        imagePreview={null}
        onImageChange={mockOnImageChange}
        className={customClass}
      />
    );
    
    const container = screen.getByLabelText('Haz clic o arrastra una imagen aquí').closest('div');
    expect(container).toHaveClass(customClass);
  });

  it('handles drag and drop events', () => {
    render(<ImageUploader imagePreview={null} onImageChange={mockOnImageChange} />);
    
    const label = screen.getByText('Haz clic o arrastra una imagen aquí').closest('label');
    if (!label) throw new Error('Label element not found');
    
    // Test drag over
    fireEvent.dragOver(label);
    expect(label).toHaveClass('border-principal-500', 'bg-principal-100');
    
    // Test drag leave
    fireEvent.dragLeave(label);
    expect(label).not.toHaveClass('border-principal-500', 'bg-principal-100');
    expect(label).toHaveClass('border-principal-180');
    
    // Test drop
    fireEvent.drop(label, {
      dataTransfer: {
        files: [mockFile],
      },
    });
    
    expect(mockOnImageChange).toHaveBeenCalledWith(mockFile);
  });

  it('applies custom dimensions to preview image', () => {
    const previewUrl = 'data:image/png;base64,test';
    render(
      <ImageUploader
        imagePreview={previewUrl}
        onImageChange={mockOnImageChange}
        maxWidth="max-w-md"
        maxHeight="max-h-96"
      />
    );
    
    const preview = screen.getByRole('img');
    expect(preview).toHaveClass('max-w-md', 'max-h-96');
  });
}); 