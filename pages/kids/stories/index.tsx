import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import SEO from 'components/basecomponents/SEO';
import stories from '../../../data/stories';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useLanguage } from 'utils/useLanguageHook';
import { getCountryVariant } from 'utils/locales';
import { GetStaticProps } from 'next';
import Custom404 from '../../404';

interface StoriesSectionProps {
  stories: Story[];
}

export interface Language {
  cs: string;
  uk: string;
  [index: string]: string;
}

export interface Story {
  title: Language;
  slug: string;
  duration: string;
  country: string;
}

const StoriesSection = ({ stories }: StoriesSectionProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const stories_CZ = stories.filter((story) => story.country === 'CZ');
  const stories_UK = stories.filter((story) => story.country === 'UA');

  const storyPanel = (story: Story) => (
    <div className="h-42 m-auto my-8 flex bg-slate-50 rounded-2xl sm:w-3/5 xl:w-2/5 xxl:w-1/3" key={story.slug}>
      <Image src={`/kids/${story.slug}.jpg`} width="300" className="rounded-l-2xl" height="200" alt={story.title[currentLanguage]} />
      <div className="flex items-center xl:ml-6 w-full">
        <div className="w-3/5">
          <p className="my-4 mx-4 md:mx-8 text-sm lg:text-xl ">{story.title[currentLanguage]}</p>
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-2 md:ml-8 text-sm lg:text-xl"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm lg:text-xl">{story.duration}</span>
          </div>
        </div>

        <Link href={`/kids/stories/${story.slug}`}>
          <a className="w-2/5 bg-primary-blue rounded-2xl text-white text-[10px] sm:text-[12px] lg:text-base p-2 w-3/5 text-center mr-4">
            {t('kids_page.playStory')}
          </a>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-[#fdf6d2] to-[#99bde4] -mb-8 -m-2">
      <SEO
        title={t(`seo.kids_page_storiesTitle.${getCountryVariant()}`)}
        description={t(`seo.kids_page_storiesDescription.${getCountryVariant()}`)}
        image="https://www.movapp.cz/icons/movapp-cover-kids.jpg"
      />
      {getCountryVariant() === 'cs' ? (
        <div className="min-h-screen m-auto py-10 px-2 sm:px-4">
          <h2 className="text-primary-blue text-center">{t('kids_page.czechStories')}</h2>
          {stories_CZ.map((story) => storyPanel(story))}
          <h2 className="text-primary-blue text-center mt-12">{t('kids_page.ukrainianStories')}</h2>
          {stories_UK.map((story) => storyPanel(story))}
        </div>
      ) : (
        <Custom404 />
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { stories, ...(await serverSideTranslations(locale ?? 'cs', ['common'])) },
  };
};

export default StoriesSection;
