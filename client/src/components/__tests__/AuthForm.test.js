import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import AuthForm from '../AuthForm/AuthForm';
import axios from 'axios'

jest.mock('axios'); // Mock axios

/* 
describe('hello function', () => {
    test('throws if not passed a name', () => {
        expect(() => hello()).toThrow()
        expect(() => hello()).toThrowError('Invalid name')    
    })
    test('returns "Hello, World!"', () => {
        const expected = "Hello, Peter"
        const actual = hello("Peter")
        expect(actual).toBe(expected)
        // playground
        expect({ a: 1}).toEqual({ a: 1 })
        expect([1, 2]).toEqual([1, 2])
        expect([1, 2]).toHaveLength(2)
        expect([1, 2].length).toBeLessThan(3)
        let arr = [1, 2, 3]
        expect(arr.at(-1)).toBe(3)
        let user = { username: 'Lady Gaga', password: '1234'}
        expect(user.username).toBe('Lady Gaga')
        expect(user.username).not.toBe('Metallica')
    })
})
*/

describe('AuthForm component', () => {
    it('renders the correct heading when registering', () => {
        render(
            <BrowserRouter>
              <AuthForm />
            </BrowserRouter>
        );
        // screen.debug
    })
    it('renders the correct fields when registering', () => {
        

    })
    it('renders the correct buttons when registering', () => {
        

    })
    it('renders the correct heading when logging in', () => {
        

    })
    it('renders the correct fields when logging in', () => {
        

    })
    it('renders the correct buttons when logging in', () => {
        

    })
})