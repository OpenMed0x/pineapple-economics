import PortfolioDetail from '../../../components/portfolio/PortfolioDetail';

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PortfolioDetail portfolioId={id} />;
}