import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import AppRoutes from './router/AppRoutes'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<AppRoutes />
			<Toaster
				theme={localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}
				position='top-right'
				richColors
				closeButton
				expand={true}
			/>
		</Provider>
	</BrowserRouter>,
)
