import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import HomePage from '../HomePage/HomePage';

// Mock react-router-dom
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn(),
}));

describe('HomePage', () => {
    test('calls handleCTAClick handler and navigates when clicked', () => {
        const mockNavigate = jest.fn();
        jest.spyOn(require('react-router'), 'useNavigate').mockReturnValue(mockNavigate);
    
        render(
            <BrowserRouter>
                <HomePage token={null}/>
            </BrowserRouter>
        );
        const button = screen.getByTestId('get-started-button');
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/register');
    })
})