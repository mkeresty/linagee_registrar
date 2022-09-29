import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  color: 'red',
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props: any) => {


  return (
    <div >
      <Modal
        open={ props.modalState }
        //onClose={ props.setModalOpen(false) }
        onBackdropClick={() => props.setModalOpen(false) }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box className="sketch-button modal" sx={style} >
          <Typography className="sketch-font med-font" id="modal-modal-description" sx={{ mt: 2, fontSize: 'h6.fontSize', fontWeight: 'bold' }}>
         { props.parentToChild }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;