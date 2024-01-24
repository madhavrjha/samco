import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './store/Provider.tsx'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppProvider>
					<CssBaseline />
					<App />
				</AppProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
)
