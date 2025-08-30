import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

/*Хдесь будет хранение только глобальных состояний*/

const App = () => {
	const [globalState, setGlobalState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function changeIsOpen() {
		setIsOpen((prev) => {
			return !prev;
		});
	}

	function closeMenu() {
		setIsOpen(false);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': globalState.fontFamilyOption.value,
					'--font-size': globalState.fontSizeOption.value,
					'--font-color': globalState.fontColor.value,
					'--container-width': globalState.contentWidth.value,
					'--bg-color': globalState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setGlobalState={setGlobalState}
				isOpen={isOpen}
				changeIsOpen={changeIsOpen}
			/>
			<Article closeMenu={closeMenu} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
