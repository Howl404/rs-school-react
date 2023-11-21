// import React, { ReactNode } from 'react';
// import { wrapper } from 'src/store/store';
// import { cls } from 'src/utils/cls';

// import { apiService } from 'store/api/api';

// import { Product } from 'src/interfaces/product';

// import CardList from 'components/cardList/CardList';
// import Pagination from 'components/pagination/Pagination';
// import Search from 'components/search/Search';

// import styles from './layout.module.scss';

// interface LayoutPageProps {
//   data: Product[] | undefined;
//   searchTerm: string;
//   page: number;
//   perPage: string;
//   children: ReactNode | undefined;
// }

// export default function Layout({
//   data,
//   page,
//   perPage,
//   children,
// }: LayoutPageProps) {
//   return (
//     <>
//       <Search />
//       <div className={cls(children && styles.wrapper)}>
//         <CardList data={data} />
//         {children}
//       </div>
//       <Pagination page={page} perPage={perPage} />
//     </>
//   );
// }
