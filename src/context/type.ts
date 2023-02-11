// eslint-disable-next-line import/no-cycle
import { DBType } from '@/db/type';

export type AppContext = {
  readonly userId?: string;
  readonly dataSource: {
    db: DBType;
  };
};
