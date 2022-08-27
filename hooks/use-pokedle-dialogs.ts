import { useState } from "react";

enum PokedleDialogs {
  HELP = "HELP",
  STATISTICS = "STATISTICS",
}

type PokedleDialogsState = {
    activeDialog: PokedleDialogs | ''
    openStatisticsDialog: () => void
    openHelpDialog: () => void
    closeDialog: () => void
}

export const usePokedleDialogs = (): PokedleDialogsState => {
    const [activeDialog, setActiveDialog] = useState<PokedleDialogs | "">("");

    const openStatisticsDialog = () => {
        setActiveDialog(PokedleDialogs.STATISTICS)
    }

    const openHelpDialog = () => {
        setActiveDialog(PokedleDialogs.HELP)
    }

    const closeDialog = () => {
        setActiveDialog('')
    }

    return {
        activeDialog,
        openStatisticsDialog,
        openHelpDialog,
        closeDialog
    }
};
