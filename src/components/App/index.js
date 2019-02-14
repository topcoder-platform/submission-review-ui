/**
 * Component that sets the general structure of the app
 */
import React from 'react'
import TwoColsLayout from '../TwoColsLayout'
import Footer from '../Footer'

const App = (content, topbar, sidebar) => () => {
  return (
    <TwoColsLayout>
      <TwoColsLayout.Sidebar>
        {sidebar}
      </TwoColsLayout.Sidebar>
      <TwoColsLayout.Content>
        {topbar || null}
        {content}
        <Footer />
      </TwoColsLayout.Content>
    </TwoColsLayout>
  )
}

export default App
