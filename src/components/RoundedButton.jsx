import { Button } from "@mui/material"

function RoundedButton({ text, variant }) {
  return (
    <>
    { variant == 'contained' ?
    <Button variant='contained' sx={{ minHeight: '44px', mb: '12px', backgroundColor: 'white', color: 'black', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold'}} fullWidth>{text}</Button>
    :
    <Button variant={variant} sx={{ minHeight: '44px', mb: '12px', color: 'text.primary', border: '1px solid #536471', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold'}} fullWidth>{text}</Button>
    }
    </>
  )
}

export default RoundedButton