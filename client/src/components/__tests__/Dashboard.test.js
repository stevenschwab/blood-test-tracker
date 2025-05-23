import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Dashboard from '../Dashboard/Dashboard';

// Mock API server
const server = setupServer(
    rest.get('/api/tests', (req, res, ctx) => {
        return res(ctx.json({ name: 'John Doe', email: 'john@example.com' }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('dashboard', () => {
    test('loads and displays user test data', async () => {
        render(<Dashboard userId="123" />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        })

        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    })
})