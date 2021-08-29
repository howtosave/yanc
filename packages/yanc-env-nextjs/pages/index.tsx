import React from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from "../components/Layout";

const IndexPage: React.FC<any> = () => {
  const { t } = useTranslation('page-index');

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>{t("welcome")} 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
}

export default IndexPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'page-index'])),
      // Will be passed to the page component as props
    },
  };
}
