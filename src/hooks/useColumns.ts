import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

export type ColumnType = {dataIndex: string}
export type ColumnsType = ColumnType[];
const useColumns = <T,>(
    columns: ColumnsType,
    storageProps?: { storageKey: string; defaultColumnKeys: string[] },
) => {
    const [columnKeys, setColumnKeys] = useLocalStorage<string[]>(
        storageProps?.storageKey || '',
        storageProps?.defaultColumnKeys,
    );
    const [sortedColumnKeys, setSortedColumnKeys] = useLocalStorage<string[]>(
        storageProps?.storageKey ? `${storageProps?.storageKey}:sorted` : '',
        columns.map((c) => c.dataIndex),
    );

    const columnsMap: Map<string, ColumnType> = useMemo(() => {
        const columnsMap = new Map();
        columns.map((c: ColumnType) => columnsMap.set(c.dataIndex, c));

        return columnsMap;
    }, [columns]);

    const filteredColumns = useMemo(
        () => sortedColumnKeys.filter((k) => columnKeys.includes(k)).map((key) => columnsMap.get(key)),
        [columnKeys, columns],
    );

    const sortedColumns = useMemo(
        () => sortedColumnKeys.map((key) => columnsMap.get(key)),
        [sortedColumnKeys, columns],
    );

    return {
        columns,
        filteredColumns,
        sortedColumns,
        setSortedColumnKeys,
        columnKeys,
        setColumnKeys,
    };
};

export default useColumns;
