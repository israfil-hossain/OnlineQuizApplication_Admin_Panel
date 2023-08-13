import React from 'react'
import PackageBreadcrumb from '../components/common/PackageBreadcrumb'
import { Box, Breadcrumbs } from '@mui/material'
import { Link } from 'react-router-dom'
import { BsSliders } from 'react-icons/bs'

const Subscription = () => {
  return (
    <div>
        <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <BsSliders size={23} className="min-w-max text-gray-500" />
              &nbsp; Subscription
            </Box>
          </Link>
          {/* <Typography color="grey">sdfgh</Typography> */}
        </Breadcrumbs>
      </PackageBreadcrumb>
    </div>
  )
}

export default Subscription