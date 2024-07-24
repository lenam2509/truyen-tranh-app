// "use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Params = {
  type_slug: string;
  pagination: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    pageRanges: number;
  };
};

export default function PaginationComponent({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: any;
}) {
  //   const searchParams = useSearchParams();
  //   const pathName = usePathname();
  //   const router = useRouter();
  const currentPage = params.pagination.currentPage;
  const pageRanges = params.pagination.pageRanges;
  const totalPages = Math.ceil(
    params.pagination.totalItems / params.pagination.totalItemsPerPage
  );
  let startPage = Math.max(1, currentPage - Math.floor(pageRanges / 2));
  let endPage = Math.min(totalPages, startPage + pageRanges - 1);

  if (endPage - startPage < pageRanges - 1) {
    startPage = Math.max(1, endPage - pageRanges + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap md:flex-nowrap justify-center">
        <PaginationPrevious
          href={
            currentPage === 1
              ? {
                  query: { ...searchParams, page: 1 },
                }
              : {
                  query: { ...searchParams, page: currentPage - 1 },
                }
          }
        >
          <p>Previous</p>
        </PaginationPrevious>

        {pages.map((page) => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                href={{
                  query: {
                    ...searchParams,
                    page: page,
                  },
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {endPage < totalPages && <PaginationEllipsis>...</PaginationEllipsis>}
        <PaginationItem>
          <p className="">{totalPages}</p>
        </PaginationItem>

        <PaginationNext
          href={{
            query: { ...searchParams, page: currentPage + 1 },
          }}
        >
          <p>Next</p>
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
}
