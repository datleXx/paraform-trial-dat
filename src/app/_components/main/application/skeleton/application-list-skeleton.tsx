import { TableBody, TableRow, TableCell } from "@tremor/react";
import { Skeleton } from "@mui/material";

const ApplicationListSkeleton = () => {
  return (
    <TableBody>
      {Array.from({ length: 20 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton variant="text" width={200} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={200} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={200} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={200} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={100} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={100} height={20} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ApplicationListSkeleton;
