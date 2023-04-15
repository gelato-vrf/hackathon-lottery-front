import React from "react";
import { Button, IconLockClosed, Stack, ThemeProvider } from "degen";

const DepositButtonExemple = () => {
  return (
    <ThemeProvider>
      <Stack align="center">
        <Button
          prefix={<IconLockClosed />}
          variant="primary"
          width={{ xs: "full", md: "max" }}
        >
          Connect Wallet
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default DepositButtonExemple;
