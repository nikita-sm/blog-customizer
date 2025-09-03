import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

const App = () => {
	const [globalState, setGlobalState] =
		useState<ArticleStateType>(defaultArticleState);

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
			<ArticleParamsForm setGlobalState={setGlobalState} />
			<Article />
		</main>
	);
};

export default App;
