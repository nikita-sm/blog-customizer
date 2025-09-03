import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions /*Массив начертаний шрифтов*/,
	fontSizeOptions /*Массив размеров шрифтов*/,
	fontColors /*Массив цветом шрифтов*/,
	backgroundColors /*Массив цветом фона*/,
	contentWidthArr /*Ширина контента*/,
	defaultArticleState /*Стартовые значения для стейта*/,
} from 'src/constants/articleProps';
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';

/*Импорт компонентов для настройки формы*/

type ArticleParamsFormProps = {
	setGlobalState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setGlobalState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	/*Переиспользование хука для закрытия меню по клику снаружи этого самого меню*/
	useOutsideClickClose({
		rootRef: rootRef,
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
	});

	/*Установили стейт согласно данным по умолчанию - задачы в переменных*/
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const handleChange = (fieldName: string) => {
		/*fieldName - поле из Стейта*/
		return (value: OptionType) => {
			/*value - Значение из полей*/
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	function changeIsOpen() {
		setIsMenuOpen((prev) => {
			return !prev;
		});
	}

	/*Устанавливаем данные в глобальный стейт, далее идет переопределение всех стилей*/
	function applySettings(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setGlobalState(formState);
	}

	/*Сбросить данные. Установить в глобальный стейт данные, которые были заданы ранее по умолчанию*/
	function resetSettings() {
		setGlobalState(defaultArticleState);
		setFormState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={changeIsOpen} />
			<aside
				ref={rootRef}
				className={clsx(
					`${styles.container}`,
					`${isMenuOpen && styles.container_open}`
				)}>
				<h1 className={styles.title}>Задайте параметры</h1>
				<form
					className={styles.form}
					onSubmit={applySettings}
					onReset={resetSettings}>
					{/*Выбор шрифтов из выпадающего списка*/}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					{/*Выбор размеров шрифтов из радио-группы*/}
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={handleChange('contentWidth')}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
