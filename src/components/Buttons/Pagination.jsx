import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./pagination.css"

export default function PaginationRounded() {
  return (
    <>
    <div className="page m-1" >
    <Stack spacing={2}>
              <Pagination count={8} variant="outlined" shape="rounded" defaultPage={3} siblingCount={0}/>
          </Stack>
      </div>
      </>
  );
}