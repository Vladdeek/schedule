import { createRoot } from 'react-dom/client'
import AppRoutes from './router/AppRoutes'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<AppRoutes />
		<Toaster
			theme={localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}
			position='top-right'
			richColors
			closeButton
			expand={true}
		/>
	</BrowserRouter>,
)
